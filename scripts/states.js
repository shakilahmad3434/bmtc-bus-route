export async function fetchStates() {
  try {
    const res = await fetch("../data/states.json");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const states = await res.json();

    let stateHTML = "";
    states.forEach((state) => {
      const slug = state.toLowerCase().replace(/\s+/g, "-");
      stateHTML += `<a href="/${slug}">${state}</a>`;
    });

    return {stateHTML, states};
  } catch (error) {
    console.log(error);
  }
}
