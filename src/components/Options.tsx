const CHECK_ICON = "https://framerusercontent.com/images/wQY5BFOK9fwE3QUIMrG43ZlTKM.png?width=201&height=201";

const options = [
  "Extra Camera — 100 DT",
  "Extra Microphone — 50 DT",
  "Videographer — 100 DT",
  "Short-Form Clips — 100 DT",
  "Thumbnail Design — 100 DT",
  "Subtitles — 50 DT",
  "Photo Pack (10 photos) — 100 DT",
];

const Options = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground text-center mb-10">
          Add-On Options
        </h2>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option} className="flex items-center gap-3 bg-card border border-border/50 rounded-lg px-4 py-3">
              <img src={CHECK_ICON} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
              <span className="text-foreground text-sm font-medium">{option}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Options;
