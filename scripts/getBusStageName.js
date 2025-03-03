export async function getBusStageName(routeName){
  try {
    const res = await fetch(`../data/${routeName}/stages.json`);
    const data = await res.json();
    
    // Generate options using map and join
    const options = data.map(route => `
        <option value="${route}">${route}</option>
    `).join('');

    return options;

} catch (error) {
    console.error(`Bangalore Bus Route Not Load: ${error}`);
}
}