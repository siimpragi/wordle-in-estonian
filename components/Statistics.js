import Countdown from "./Countdown";

const Statistics = ({ nextSolutionTs }) => {
  return (
    <div>
      <h1>Statistika</h1>
      <p>Statistika tuleb siia.</p>
      <h2>Järgmise mänguni</h2>
      <Countdown toTs={nextSolutionTs} />
    </div>
  );
};

export default Statistics;
