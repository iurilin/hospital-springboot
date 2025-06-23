
export function debugTabs() {
  console.log("🔍 === DEBUG DAS ABAS ===")

  const tabs = document.querySelectorAll(".tab")
  const contents = document.querySelectorAll(".tab-content")

  console.log(`📋 Abas encontradas: ${tabs.length}`)
  tabs.forEach((tab, i) => {
    console.log(`  ${i + 1}. data-tab="${tab.getAttribute("data-tab")}" | classes: ${tab.className}`)
  })

  console.log(`📋 Conteúdos encontrados: ${contents.length}`)
  contents.forEach((content, i) => {
    console.log(`  ${i + 1}. id="${content.id}" | classes: ${content.className}`)
  })

  console.log("🔍 === FIM DEBUG ===")
}

window.debugTabs = debugTabs
