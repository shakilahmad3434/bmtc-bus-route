export async function fetchStates(){
  try {
    const res = await fetch('../data/states.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.log(error)
  }
}