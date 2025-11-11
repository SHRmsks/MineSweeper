import { memo, useState } from "react";
import Picker from "react-mobile-picker";

const Input = ({ selectionCallback }) => {
  const selections = {
    difficulty: ["Easy", "Medium", "Hard", "Expert"],
  };
  const [pickerValue, setPickerValue] = useState({ difficulty: "Easy" });
  return (
    <div className="w-full h-fit gap-y-[20px] flex flex-col justify-center items-center text-[20px] font-selection text-selection">
      <p> Difficulty: </p>
      <Picker
        className="h-fit"
        value={pickerValue}
        onChange={setPickerValue}
        wheelMode="natural"
      >
        <Picker.Column name="difficulty">
          {selections.difficulty.map((option) => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
      <button
        className="w-[30%] h-fit py-[4px] bg-button rounded-3xl"
        onClick={() => selectionCallback(pickerValue.difficulty)}
      >
        Play!!
      </button>
    </div>
  );
};
export default memo(Input);
