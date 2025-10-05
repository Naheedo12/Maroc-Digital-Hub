function Dashboard() {
  const stats = [
    {
      title: "Startups Inscrites",
      value: "11",
      icon: (
        <svg className="w-8 h-8 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Événements Créés",
      value: "5",
      icon: (
        <svg className="w-8 h-8 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Participants",
      value: "16",
      icon: (
        <svg className="w-8 h-8 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ]

  const sectorData = [
    { sector: "IA", percentage: 18, color: "bg-[#14b8a6]" },
    { sector: "IA", percentage: 18, color: "bg-[#14b8a6]" },
    { sector: "IA", percentage: 18, color: "bg-[#14b8a6]" },
    { sector: "IA", percentage: 9, color: "bg-[#ff9f7f]" },
    { sector: "IA", percentage: 9, color: "bg-[#14b8a6]" },
    { sector: "IA", percentage: 9, color: "bg-[#ff9f7f]" },
    { sector: "IA", percentage: 9, color: "bg-[#14b8a6]" },
    { sector: "IA", percentage: 9, color: "bg-[#ff9f7f]" },
  ]

  return (
    <div className="min-h-screen bg-[#fef5f1] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d7377] text-center mb-12">Tableau de Bord Administrateur</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-2">
                <div>{stat.icon}</div>
                <div className="text-4xl font-bold text-[#0d7377]">{stat.value}</div>
              </div>
              <h3 className="text-gray-600 font-medium text-sm">{stat.title}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#0d7377] mb-8">Répartition des Startups par Secteur</h2>
          <div className="space-y-3">
            {sectorData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 text-xs font-medium text-gray-600">{item.sector}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-7 overflow-hidden">
                  <div
                    className={`${item.color} h-full flex items-center justify-end pr-3 text-white text-xs font-semibold transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
