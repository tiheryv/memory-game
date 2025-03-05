import brain from "../assets/brain.svg";

interface ScoresProps {
  fail: number;
  win: number;
}

interface ScoreBarProps {
  username: string;
  score: ScoresProps;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ username, score }) => {
  return (
    <div className="scorebar__container font-pixel text-sm bg-secondary px-10 my-3 py-6 border-y border-light text-light flex justify-between">
      <div className="scorebar__player self-center">
        <p>Player:</p>
        <p className="text-xs tracking-widest underline bg-neonGreen text-black p-1 rounded-lg">
          {username}
        </p>
      </div>
      <img
        src={brain}
        alt="Memory game logo"
        width={32}
        className="scorebar__logo"
      />
      <div className="scorebar__score">
        <p>Score:</p>
        <p className="text-xs text-green-300">Wins: {score.win}</p>
        <p className="text-xs text-red-500">Fails: {score.fail}</p>
      </div>
    </div>
  );
};

export default ScoreBar;
