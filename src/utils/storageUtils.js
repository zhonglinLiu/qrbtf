const STORAGE_KEYS = {
    PRESETS: 'presets'
};

export function getPresets() {
    let presetArray = [];
    const presetsValue = localStorage.getItem(STORAGE_KEYS.PRESETS);
    if (presetsValue) {
        presetArray = JSON.parse(presetsValue);
    }
    return presetArray;
}

export function appendPreset(preset) {
    const presets = getPresets();
    presets.push(preset);
    localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(presets));
}

export function removePreset(index) {
    const presets = getPresets();
    presets.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(presets));
}