// Migration script to update old data in localStorage

export function migrateKitchenData() {
  try {
    const stored = localStorage.getItem('graphitube_kitchen_data');
    if (stored) {
      console.log('🔄 Migrating kitchen data...');
      const data = JSON.parse(stored);
      let hasChanges = false;
      
      // Add missing fields for decoration and color steps
      if (!data.decoration) {
        data.decoration = { installation: undefined, finish: undefined, kitchenColor: '' };
        hasChanges = true;
      } else {
        if (data.decoration.installation === undefined) {
          data.decoration.installation = undefined;
          hasChanges = true;
        }
        if (data.decoration.finish === undefined) {
          data.decoration.finish = undefined;
          hasChanges = true;
        }
        if (!data.decoration.kitchenColor) {
          data.decoration.kitchenColor = '';
          hasChanges = true;
        }
      }
      
      if (!data.color) {
        data.color = { kitchenColor: '', installation: undefined, finish: undefined };
        hasChanges = true;
      } else {
        if (!data.color.kitchenColor) {
          data.color.kitchenColor = '';
          hasChanges = true;
        }
        if (data.color.installation === undefined) {
          data.color.installation = undefined;
          hasChanges = true;
        }
        if (data.color.finish === undefined) {
          data.color.finish = undefined;
          hasChanges = true;
        }
      }
      
      // Save updated data only if there were changes
      if (hasChanges) {
        localStorage.setItem('graphitube_kitchen_data', JSON.stringify(data));
        console.log('✅ Kitchen data migrated successfully');
      } else {
        console.log('ℹ️ Kitchen data is already up to date');
      }
    }
  } catch (error) {
    console.error('❌ Error migrating kitchen data:', error);
    // Clear corrupted data
    localStorage.removeItem('graphitube_kitchen_data');
  }
}

export function migrateSalonData() {
  try {
    const stored = localStorage.getItem('graphitube_salon_data');
    if (stored) {
      console.log('🔄 Migrating salon data...');
      const data = JSON.parse(stored);
      let hasChanges = false;
      
      // Add missing fields for pattern and color steps
      if (data.selectedPattern === undefined) {
        data.selectedPattern = '';
        hasChanges = true;
      }
      
      if (data.selectedColor === undefined) {
        data.selectedColor = '';
        hasChanges = true;
      }
      
      // Save updated data only if there were changes
      if (hasChanges) {
        localStorage.setItem('graphitube_salon_data', JSON.stringify(data));
        console.log('✅ Salon data migrated successfully');
      } else {
        console.log('ℹ️ Salon data is already up to date');
      }
    }
  } catch (error) {
    console.error('❌ Error migrating salon data:', error);
    // Clear corrupted data
    localStorage.removeItem('graphitube_salon_data');
  }
}

// Run migrations on app load
export function runMigrations() {
  console.log('🚀 Running data migrations...');
  
  // Clear all old data for fresh start
  const clearOldData = false; // Set to true to clear localStorage
  
  if (clearOldData) {
    console.log('🧹 Clearing old localStorage data...');
    localStorage.removeItem('graphitube_kitchen_data');
    localStorage.removeItem('graphitube_salon_data');
    console.log('✅ Old data cleared');
  } else {
    migrateKitchenData();
    migrateSalonData();
  }
  
  console.log('✅ Migrations complete');
}