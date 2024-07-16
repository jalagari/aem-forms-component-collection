

function getComponentRender(component) {
  const { title, description, plugins: { xwalk: { page: { template: {fieldType}}}} } = component;
  const template = `<a href="/developer/component/${title}" title="${title}" class="card">
                      <!-- <img src="thumbnail.jpg" alt="Thumbnail" class="card-thumbnail"> -->
                      <h5 class="card-title">${title}</h5>
                      <p class="card-type"><em>${fieldType}</em></p>
                      <p class="card-description">${description || ""}</p>
                  </a>`
  return template;

}
async function getComponents() {
  let components = [];
  const response = await fetch('/component-definition.json')
  if (response.ok && response.headers.get('Content-Type').startsWith('application/json')) {
    const result = await response.json()
    if (result && result.groups) {
      const group = result.groups.find(group => group.id === 'form-general')
      components = group ? group.components : []
    }
  }
  return components;
}
export default function decorate(block) {

  getComponents().then(components => {
    const container = document.createDocumentFragment()
    container.innerHTML = '';
    components?.forEach((component) => {
      container.innerHTML += getComponentRender(component);
    });
    block.innerHTML  = container.innerHTML;
  });
}
