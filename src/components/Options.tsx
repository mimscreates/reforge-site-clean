const CHECK_ICON = "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const options = [
  "Caméra Supplémentaire 100 DT",
  "Micro Supplémentaire 50 DT",
  "Technicien vidéaste 100 DT",
  "Shorts 100 DT",
  "Thumbnail 100 DT",
  "Sous-titres 50 DT",
  "Pack de photos (10) 100 DT",
];

const Options = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-12">
          Options
        </h2>
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
              <img src={CHECK_ICON} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
              <span className="text-foreground font-medium">{option}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Options;
