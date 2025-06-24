export function initializeTabs() {
  console.log("🔄 Inicializando sistema de abas...")

  function switchTabs(tabId) {
    console.log(`🔄 Trocando para aba: ${tabId}`)

    try {
      const allTabs = document.querySelectorAll(".tab")
      allTabs.forEach((tab) => tab.classList.remove("active"))

      const allContents = document.querySelectorAll(".tab-content")
      allContents.forEach((content) => content.classList.remove("active"))

      const targetTab = document.querySelector(`.tab[data-tab="${tabId}"]`)
      if (targetTab) {
        targetTab.classList.add("active")
        console.log(`✅ Aba ${tabId} ativada`)
      } else {
        console.error(`❌ Aba ${tabId} não encontrada`)
        return false
      }

      const targetContent = document.getElementById(tabId)
      if (targetContent) {
        targetContent.classList.add("active")
        console.log(`✅ Conteúdo ${tabId} ativado`)
      } else {
        console.error(`❌ Conteúdo ${tabId} não encontrado`)
        return false
      }

      return true
    } catch (error) {
      console.error("❌ Erro ao trocar abas:", error)
      return false
    }
  }

  const tabs = document.querySelectorAll(".tab")
  console.log(`📋 Total de abas encontradas: ${tabs.length}`)

  if (tabs.length === 0) {
    console.warn("⚠️ Nenhuma aba encontrada")
    return false
  }

  tabs.forEach((tab, index) => {
    const tabId = tab.getAttribute("data-tab")
    console.log(`🔗 Configurando aba ${index + 1}: ${tabId}`)

    tab.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(`🖱️ Clique na aba: ${tabId}`)
      switchTabs(tabId)
    })
  })

  console.log("✅ Sistema de abas inicializado com sucesso")
  return true
}
