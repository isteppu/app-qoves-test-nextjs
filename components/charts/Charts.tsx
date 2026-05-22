import BellCurveChart from "./BellCurveChart";
import MatrixChart from "./MatrixChart";
import styles from "./css/Charts.module.scss";
import LipSmoothnessChart from "./LipSmoothnessChart";
import MelaninSpectrumChart from "./MelaninSpectrumChart";
import FacialThirdsChart from "./FacialThirdsCard";
import SymmetryChart from "./SymmetryChart";

const Charts = ({ containerClass }: { containerClass: string }) => {

  const getCardClasses = (id: number) => {
    let cls = `${containerClass} ${styles[`card${id}`]}`;
    return cls;
  };

  return (
    <div>
      <div className={getCardClasses(1)}>
        <MatrixChart/>
      </div>
      <div className={getCardClasses(2)}>
        <BellCurveChart />
      </div>

      <div className={getCardClasses(3)}>
        <LipSmoothnessChart />
      </div>

      <div className={getCardClasses(4)}>
        <MelaninSpectrumChart />
      </div>

      <div className={getCardClasses(5)}>
        <FacialThirdsChart />
      </div>

      <div className={getCardClasses(6)}>
        <SymmetryChart />
      </div>
    </div>
  );
};

export default Charts;