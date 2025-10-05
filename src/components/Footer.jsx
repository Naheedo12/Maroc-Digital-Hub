function Footer() {
  return (
    <footer className="bg-[#0d7377] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Maroc Digital Hub */}
          <div>
            <h3 className="text-lg font-bold mb-4">Maroc Digital Hub</h3>
            <p className="text-sm text-gray-100 leading-relaxed">
              Plateforme de connexion de l'écosystème numérique marocain. Dynamisons l'innovation ensemble.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-100 hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/events" className="text-gray-100 hover:text-white transition-colors">
                  Événements
                </a>
              </li>
              <li>
                <a href="/forum" className="text-gray-100 hover:text-white transition-colors">
                  Discussion
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-100 hover:text-white transition-colors">
                  Tableau de bord
                </a>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-100 mb-3">Restez informé de l'actualité des startups</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-100">
          <p>2025 Maroc Digital Hub. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer