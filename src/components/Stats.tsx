const Stats = () => {
  const statistics = [
    { number: "500+", label: "Atletas Cadastrados" },
    { number: "50+", label: "Clubes Parceiros" },
    { number: "200+", label: "Peneiras Realizadas" },
    { number: "150+", label: "Atletas Aprovados" }
  ];

  return (
    <section className="py-20 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-5xl md:text-6xl font-heading font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
