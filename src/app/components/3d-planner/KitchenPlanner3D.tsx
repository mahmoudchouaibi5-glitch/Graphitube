import { useState, useEffect, useRef } from 'react';
import { ThreeScene } from './ThreeScene';
import { ObjectLibrary } from './ObjectLibrary';
import { ObjectsList } from './ObjectsList';
import { TopBar } from './TopBar';
import { PropertiesPanel } from './PropertiesPanel';
import { PropertiesPanelMobile } from './PropertiesPanelMobile';
import { WallSystem, RoomDimensions, Wall } from './WallSystem';
import { QuoteModal } from './QuoteModal';
import { Menu, X, Undo, Redo, Grid3x3, Camera, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation, getObjectName } from './translations';

export interface ObjectItem {
  id: string;
  name: string;
  icon: string;
  category: 'appliances' | 'cabinets' | 'furniture';
  baseDimensions?: { width: number; height: number; depth: number }; // in meters - optional for backward compatibility
}

export interface PlacedObject {
  item: ObjectItem;
  timestamp: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  color?: string;
}

// History management for undo/redo
interface HistoryState {
  objects: PlacedObject[];
  selectedId: number | null;
}

const MAX_HISTORY = 50; // Keep last 50 actions

const LIBRARY_ITEMS: ObjectItem[] = [
  {
    id: 'fridge',
    name: 'Fridge',
    icon: '❄️',
    category: 'appliances',
    baseDimensions: { width: 0.7, height: 1.8, depth: 0.7 } // 70cm x 180cm x 70cm
  },
  {
    id: 'oven',
    name: 'Oven',
    icon: '🔥',
    category: 'appliances',
    baseDimensions: { width: 0.6, height: 0.65, depth: 0.6 } // 60cm x 65cm x 60cm
  },
  {
    id: 'cabinet-base',
    name: 'Base Cabinet',
    icon: '📦',
    category: 'cabinets',
    baseDimensions: { width: 0.6, height: 0.85, depth: 0.6 } // 60cm x 85cm x 60cm
  },
  {
    id: 'cabinet-wall',
    name: 'Wall Cabinet',
    icon: '🗄️',
    category: 'cabinets',
    baseDimensions: { width: 0.6, height: 0.7, depth: 0.35 } // 60cm x 70cm x 35cm
  },
  {
    id: 'sink',
    name: 'Sink',
    icon: '🚰',
    category: 'furniture',
    baseDimensions: { width: 0.6, height: 0.05, depth: 0.6 } // 60cm x 5cm x 60cm (with counter)
  },
  {
    id: 'countertop',
    name: 'Countertop',
    icon: '▭',
    category: 'furniture',
    baseDimensions: { width: 1.2, height: 0.05, depth: 0.6 } // 120cm x 5cm x 60cm
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    icon: '🍽️',
    category: 'appliances',
    baseDimensions: { width: 0.6, height: 0.85, depth: 0.6 } // 60cm x 85cm x 60cm
  },
  {
    id: 'stove',
    name: 'Stove',
    icon: '🔵',
    category: 'appliances',
    baseDimensions: { width: 0.6, height: 0.08, depth: 0.6 } // 60cm x 8cm x 60cm (cooktop)
  }
];

export function KitchenPlanner3D() {
  const [selectedObject, setSelectedObject] = useState<ObjectItem | null>(null);
  const [addedObjects, setAddedObjects] = useState<PlacedObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileShowLibrary, setMobileShowLibrary] = useState(true);
  const [mobileView, setMobileView] = useState<'warehouse' | 'library' | 'properties'>('warehouse');
  const [desktopView, setDesktopView] = useState<'library' | 'layers' | 'properties' | null>(null); // Closed by default
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([{ objects: [], selectedId: null }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Grid settings
  const [showGrid, setShowGrid] = useState(true);
  const [gridSnapping, setGridSnapping] = useState(true);
  const [gridSize] = useState(0.1); // 10cm grid

  // Camera views
  const [cameraView, setCameraView] = useState<'free' | 'top' | 'front' | 'side'>('free');

  // Screenshot
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastScreenshot, setLastScreenshot] = useState<string | undefined>();

  // Quote Modal
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Instructions visibility
  const [showInstructions, setShowInstructions] = useState(true);

  // Screenshot function
  const handleScreenshot = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    setIsCapturing(true);
    
    // Wait for next frame to ensure UI updates
    setTimeout(() => {
      const canvas = rendererRef.current?.domElement;
      if (canvas) {
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `kitchen-design-${Date.now()}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            
            // Also save for quote modal
            canvas.toDataURL('image/png');
            setLastScreenshot(canvas.toDataURL('image/png'));
          }
          setIsCapturing(false);
        }, 'image/png', 1.0);
      }
    }, 100);
  };

  // Export design data
  const handleExportDesign = () => {
    const designData = {
      objects: addedObjects.map(obj => ({
        type: obj.item.name,
        id: obj.item.id,
        category: obj.item.category,
        position: obj.position,
        rotation: obj.rotation,
        scale: obj.scale,
        color: obj.color,
        baseDimensions: obj.item.baseDimensions
      })),
      timestamp: Date.now(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(designData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `kitchen-design-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Get reference to scene/camera/renderer for screenshot
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);

  // Save current state to history
  const saveToHistory = (newObjects: PlacedObject[], newSelectedId: number | null) => {
    const newState: HistoryState = {
      objects: JSON.parse(JSON.stringify(newObjects)), // Deep copy
      selectedId: newSelectedId
    };
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    // Keep only MAX_HISTORY states
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setHistory(newHistory);
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const state = history[newIndex];
      setAddedObjects(JSON.parse(JSON.stringify(state.objects)));
      setSelectedObjectId(state.selectedId);
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const state = history[newIndex];
      setAddedObjects(JSON.parse(JSON.stringify(state.objects)));
      setSelectedObjectId(state.selectedId);
    }
  };

  // Snap to grid
  const snapToGrid = (value: number): number => {
    if (!gridSnapping) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  // Duplicate object
  const handleDuplicateObject = (timestamp: number) => {
    const objectToDuplicate = addedObjects.find(obj => obj.timestamp === timestamp);
    if (!objectToDuplicate) return;

    const newObject: PlacedObject = {
      ...JSON.parse(JSON.stringify(objectToDuplicate)),
      timestamp: Date.now(),
      position: {
        x: objectToDuplicate.position.x + 0.3, // Offset by 30cm
        y: objectToDuplicate.position.y,
        z: objectToDuplicate.position.z + 0.3
      }
    };

    const newObjects = [...addedObjects, newObject];
    setAddedObjects(newObjects);
    setSelectedObjectId(newObject.timestamp);
    saveToHistory(newObjects, newObject.timestamp);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-open properties panel when an object is selected on desktop
  useEffect(() => {
    console.log('🔍 useEffect triggered:', { selectedObjectId, isMobile, desktopView });
    
    if (!isMobile && selectedObjectId !== null) {
      console.log('✅ Opening properties panel');
      setDesktopView('properties');
    } else if (!isMobile && selectedObjectId === null && desktopView === 'properties') {
      // Close properties if no object is selected
      console.log('❌ Closing properties panel');
      setDesktopView(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObjectId, isMobile]);

  const handleAddObject = (item: ObjectItem) => {
    const newObject: PlacedObject = {
      item,
      timestamp: Date.now(),
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    };
    setAddedObjects([...addedObjects, newObject]);
    setShowMobileMenu(false);
    saveToHistory([...addedObjects, newObject], newObject.timestamp);
  };

  const handleObjectSelect = (timestamp: number | null) => {
    setSelectedObjectId(timestamp);
    
    if (timestamp !== null) {
      // Open mobile menu when selecting an object on mobile
      if (isMobile) {
        setShowMobileMenu(true);
        setMobileShowLibrary(false); // Show properties, not library
        setMobileView('properties');
      } else {
        // Open properties panel on desktop
        setDesktopView('properties');
      }
    }
  };

  const handleObjectUpdate = (timestamp: number, updates: Partial<PlacedObject>) => {
    const newObjects = addedObjects.map(obj =>
      obj.timestamp === timestamp ? { ...obj, ...updates } : obj
    );
    setAddedObjects(newObjects);
    saveToHistory(newObjects, timestamp);
  };

  const handleDeleteObject = (timestamp: number) => {
    const newObjects = addedObjects.filter(obj => obj.timestamp !== timestamp);
    setAddedObjects(newObjects);
    setSelectedObjectId(null);
    saveToHistory(newObjects, null);
  };

  const handleSave = () => {
    const data = {
      objects: addedObjects,
      timestamp: new Date().toISOString()
    };
    alert(getKitchenTranslation(language, 'saveSuccess'));
  };

  const selectedObjectData = addedObjects.find(obj => obj.timestamp === selectedObjectId);
  const objectCountText = addedObjects.length === 1 
    ? getKitchenTranslation(language, 'objectCount')
    : getKitchenTranslation(language, 'objectsCount');

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <TopBar 
        onSave={handleSave} 
        onScreenshot={handleScreenshot}
        onExport={handleExportDesign}
        onRequestQuote={() => setShowQuoteModal(true)}
      />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        objects={addedObjects}
        screenshot={lastScreenshot}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Sidebar - Library or Layers */}
        {!isMobile && (desktopView === 'library' || desktopView === 'layers') && (
          <aside className="w-64 min-w-[256px] flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto z-30 relative">
            {desktopView === 'library' && (
              <ObjectLibrary items={LIBRARY_ITEMS} onAddObject={handleAddObject} />
            )}
            {desktopView === 'layers' && (
              <ObjectsList
                objects={addedObjects}
                selectedId={selectedObjectId}
                onSelect={handleObjectSelect}
                onDelete={handleDeleteObject}
                onDuplicate={handleDuplicateObject}
              />
            )}
          </aside>
        )}
        
        {/* 3D Workspace */}
        <main className="flex-1 relative">
          {/* Desktop Navigation Buttons - Only on Desktop */}
          {!isMobile && (
            <div className={`absolute top-4 ${isRTL ? 'left-1/2 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'} z-50 flex gap-3`}>
              {/* Library Button */}
              <button
                onClick={() => setDesktopView(desktopView === 'library' ? null : 'library')}
                className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:scale-105 ${
                  desktopView === 'library'
                    ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-gray-900 shadow-lime-300'
                    : 'bg-white text-gray-600 hover:bg-lime-50'
                }`}
              >
                📦 {getKitchenTranslation(language, 'showLibrary')}
              </button>

              {/* Layers Button */}
              <button
                onClick={() => setDesktopView(desktopView === 'layers' ? null : 'layers')}
                className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:scale-105 ${
                  desktopView === 'layers'
                    ? 'bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-indigo-300'
                    : 'bg-white text-gray-600 hover:bg-indigo-50'
                }`}
              >
                📋 {getKitchenTranslation(language, 'layers')}
              </button>

              {/* Properties Button */}
              <button
                onClick={() => {
                  if (selectedObjectId) {
                    setDesktopView(desktopView === 'properties' ? null : 'properties');
                  }
                }}
                disabled={!selectedObjectId}
                className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all transform hover:scale-105 ${
                  desktopView === 'properties' && selectedObjectId
                    ? 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 shadow-yellow-300'
                    : !selectedObjectId
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-yellow-50'
                }`}
              >
                ⚙️ {getKitchenTranslation(language, 'properties')}
              </button>
            </div>
          )} 

          <ThreeScene 
            addedObjects={addedObjects} 
            selectedObjectId={selectedObjectId}
            onObjectSelect={handleObjectSelect}
            onObjectUpdate={handleObjectUpdate}
            showGrid={showGrid}
            gridSnapping={gridSnapping}
            gridSize={gridSize}
            cameraView={cameraView}
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            rendererRef={rendererRef}
          />
          
          {/* Toolbar - Undo/Redo/Grid/Camera */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full shadow-xl p-2 flex items-center gap-2 border border-gray-200">
            {/* Undo */}
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-2.5 rounded-full transition-all ${
                historyIndex > 0
                  ? 'bg-white hover:bg-amber-50 text-amber-600 hover:shadow-md'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              title={getKitchenTranslation(language, 'undo')}
            >
              <Undo className="w-5 h-5" />
            </button>

            {/* Redo */}
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={`p-2.5 rounded-full transition-all ${
                historyIndex < history.length - 1
                  ? 'bg-white hover:bg-amber-50 text-amber-600 hover:shadow-md'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              title={getKitchenTranslation(language, 'redo')}
            >
              <Redo className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-300" />

            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2.5 rounded-full transition-all ${
                showGrid
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-600'
              }`}
              title={getKitchenTranslation(language, 'grid')}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>

            {/* Snapping Toggle */}
            <button
              onClick={() => setGridSnapping(!gridSnapping)}
              className={`p-2.5 rounded-full transition-all relative ${
                gridSnapping
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-600'
              }`}
              title={getKitchenTranslation(language, 'snapping')}
            >
              <span className="text-sm font-bold">🧲</span>
              {gridSnapping && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </button>

            <div className="w-px h-6 bg-gray-300" />

            {/* Camera Views */}
            <button
              onClick={() => setCameraView('free')}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                cameraView === 'free'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getKitchenTranslation(language, 'free')}
            </button>
            <button
              onClick={() => setCameraView('top')}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                cameraView === 'top'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getKitchenTranslation(language, 'top')}
            </button>
            <button
              onClick={() => setCameraView('front')}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                cameraView === 'front'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getKitchenTranslation(language, 'front')}
            </button>
            <button
              onClick={() => setCameraView('side')}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                cameraView === 'side'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-600'
              }`}
            >
              {getKitchenTranslation(language, 'side')}
            </button>
          </div>
          
          {/* Instructions Overlay */}
          <div className={`absolute ${isMobile ? 'top-[72px]' : 'top-4'} ${isRTL ? 'right-4' : 'left-4'} z-40`}>
            {showInstructions ? (
              <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs ${isRTL ? 'text-right' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">
                    {getKitchenTranslation(language, 'instructionsTitle')}
                  </h3>
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                    title={language === 'ar' ? 'إخفاء' : 'Masquer'}
                  >
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>{getKitchenTranslation(language, 'instruction1')}</li>
                  <li>{getKitchenTranslation(language, 'instruction2')}</li>
                  <li>{getKitchenTranslation(language, 'instruction3')}</li>
                  <li>{getKitchenTranslation(language, 'instruction4')}</li>
                  <li>{getKitchenTranslation(language, 'instruction5')}</li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => setShowInstructions(true)}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 hover:bg-white transition-all flex items-center gap-2"
                title={language === 'ar' ? 'إظهار التعليمات' : 'Afficher les instructions'}
              >
                <Info className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">
                  {language === 'ar' ? 'كيفية الاستخدام' : language === 'fr' ? 'Comment utiliser' : 'كيفاش تستعمل'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </main>

        {/* Properties Panel - Auto-show when object is selected */}
        {!isMobile && selectedObjectData && desktopView === 'properties' && (
          <aside className="w-80 min-w-[320px] flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto h-full">
            <PropertiesPanel
              object={selectedObjectData}
              onUpdate={(updates) => handleObjectUpdate(selectedObjectData.timestamp, updates)}
              onDelete={() => handleDeleteObject(selectedObjectData.timestamp)}
              onDeselect={() => {
                setSelectedObjectId(null);
                setDesktopView(null); // Close panel when deselecting
              }}
              onDuplicate={() => handleDuplicateObject(selectedObjectData.timestamp)}
            />
          </aside>
        )}
      </div>

      {/* Mobile Bottom Menu */}
      {isMobile && (
        <>
          {/* Mobile Top Toolbar */}
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-xl px-2 py-2 flex items-center gap-1.5 border border-gray-200">
              {/* Undo */}
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className={`p-2 rounded-full transition-all ${
                  historyIndex > 0
                    ? 'bg-white hover:bg-amber-50 text-amber-600'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                <Undo className="w-4 h-4" />
              </button>

              {/* Redo */}
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className={`p-2 rounded-full transition-all ${
                  historyIndex < history.length - 1
                    ? 'bg-white hover:bg-amber-50 text-amber-600'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                <Redo className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300" />

              {/* Grid Toggle */}
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-full transition-all ${
                  showGrid
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-gray-300" />

              {/* Camera Views */}
              <button
                onClick={() => setCameraView('top')}
                className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                  cameraView === 'top'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {language === 'ar' ? 'علوي' : language === 'fr' ? 'Haut' : 'لفوق'}
              </button>
              <button
                onClick={() => setCameraView('front')}
                className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                  cameraView === 'front'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {language === 'ar' ? 'أمامي' : language === 'fr' ? 'Face' : 'لقدام'}
              </button>

              <div className="w-px h-5 bg-gray-300" />

              {/* Save */}
              <button
                onClick={handleSave}
                className="px-2.5 py-1.5 rounded-full text-[10px] font-bold bg-white text-gray-600 hover:bg-gray-50 transition-all"
              >
                {language === 'ar' ? 'حفظ' : language === 'fr' ? 'Sauv.' : 'سوڤي'}
              </button>
            </div>
          </div>

          {/* Bottom Navigation Bar - 3 Tabs */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40 safe-area-pb">
            <div className="grid grid-cols-3 h-20">
              {/* Warehouse Tab */}
              <button
                onClick={() => {
                  setMobileView('warehouse');
                  setShowMobileMenu(true);
                  setMobileShowLibrary(true);
                }}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  mobileView === 'warehouse' && showMobileMenu
                    ? 'bg-gradient-to-t from-lime-50 to-white border-t-4 border-lime-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">📦</span>
                <span className={`text-xs font-bold ${
                  mobileView === 'warehouse' && showMobileMenu ? 'text-lime-700' : 'text-gray-600'
                }`}>
                  {getKitchenTranslation(language, 'showLibrary')}
                </span>
              </button>

              {/* Library Tab */}
              <button
                onClick={() => {
                  setMobileView('library');
                  setShowMobileMenu(true);
                }}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  mobileView === 'library' && showMobileMenu
                    ? 'bg-gradient-to-t from-indigo-50 to-white border-t-4 border-indigo-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">📋</span>
                <span className={`text-xs font-bold ${
                  mobileView === 'library' && showMobileMenu ? 'text-indigo-700' : 'text-gray-600'
                }`}>
                  {getKitchenTranslation(language, 'layers')}
                </span>
              </button>

              {/* Properties Tab */}
              <button
                onClick={() => {
                  if (selectedObjectId) {
                    setMobileView('properties');
                    setShowMobileMenu(true);
                    setMobileShowLibrary(false);
                  }
                }}
                disabled={!selectedObjectId}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  mobileView === 'properties' && showMobileMenu && selectedObjectId
                    ? 'bg-gradient-to-t from-yellow-50 to-white border-t-4 border-yellow-500'
                    : !selectedObjectId
                    ? 'bg-gray-100 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl opacity-${selectedObjectId ? '100' : '40'}">⚙️</span>
                <span className={`text-xs font-bold ${
                  mobileView === 'properties' && showMobileMenu && selectedObjectId 
                    ? 'text-yellow-700' 
                    : !selectedObjectId 
                    ? 'text-gray-400' 
                    : 'text-gray-600'
                }`}>
                  {getKitchenTranslation(language, 'properties')}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Content Overlay */}
          {showMobileMenu && (
            <>
              {/* Backdrop - Only show for warehouse and library, NOT for properties */}
              {mobileView !== 'properties' && (
                <div 
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                  onClick={() => setShowMobileMenu(false)}
                />
              )}
              
              <div 
                className={`fixed bottom-20 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-y-auto ${isRTL ? 'text-right' : ''} ${
                  mobileView === 'properties' ? 'max-h-[25vh]' : 'max-h-[65vh]'
                }`}
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              >
                <div className="p-4">
                  {/* Drag Handle */}
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
                  
                  {/* Content based on active tab */}
                  {mobileView === 'warehouse' && (
                    <>
                      <h2 className={`text-xl font-bold mb-4 ${isRTL ? 'text-right' : ''}`}>
                        📦 {getKitchenTranslation(language, 'showLibrary')}
                      </h2>
                      <ObjectLibrary 
                        items={LIBRARY_ITEMS} 
                        onAddObject={(item) => {
                          handleAddObject(item);
                          setShowMobileMenu(false);
                        }} 
                        mobile 
                      />
                    </>
                  )}
                  
                  {mobileView === 'library' && (
                    <>
                      <h2 className={`text-xl font-bold mb-4 ${isRTL ? 'text-right' : ''}`}>
                        📋 {getKitchenTranslation(language, 'layers')}
                      </h2>
                      <ObjectsList
                        objects={addedObjects}
                        selectedId={selectedObjectId}
                        onSelect={(id) => {
                          handleObjectSelect(id);
                          if (id) {
                            setMobileView('properties');
                          }
                        }}
                        onDelete={handleDeleteObject}
                        onDuplicate={handleDuplicateObject}
                      />
                    </>
                  )}
                  
                  {mobileView === 'properties' && selectedObjectData && (
                    <PropertiesPanelMobile
                      object={selectedObjectData}
                      onUpdate={(updates) => handleObjectUpdate(selectedObjectData.timestamp, updates)}
                      onDelete={() => {
                        handleDeleteObject(selectedObjectData.timestamp);
                        setShowMobileMenu(false);
                      }}
                      onDeselect={() => {
                        setSelectedObjectId(null);
                        setShowMobileMenu(false);
                      }}
                      onDuplicate={() => handleDuplicateObject(selectedObjectData.timestamp)}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}