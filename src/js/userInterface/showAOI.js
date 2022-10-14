export let AOIisActive = false;

export function showAOI() {
    AOIisActive === true ? AOIisActive = false : AOIisActive =true;
    console.log(AOIisActive);
}