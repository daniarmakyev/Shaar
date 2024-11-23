import { FC, useState } from "react";
import Languages from "../../components/welcomePage/languages/Languages";
import Welcome from "../../components/welcomePage/welcome/Welcome";

const WelcomePage: FC = () => {
  const [level, setLevel] = useState(1);

  return (
    <div className="scroll-none">
      <Languages isActive={level === 1} setLanguageSetted={() => setLevel(2)} />
      <Welcome isActive={level === 2} />
    </div>
  );
};

export default WelcomePage;
