import AddInterestInput from "../../components/Input/AddInterestInput"
import CheckboxInput from "../../components/Input/CheckboxInput"
import TextareaInput from "../../components/Input/TextareaInput"

const YourStory = () => {
  return (
    <div>
      <div className="my-8">
        <h1 className="font-ItalicFont text-3xl mb-1">What are you like?</h1>
        <p className="text-SecondaryColor text-lg">A line or two about you, then the things you’re into.</p>
      </div>
      <div className="w-full space-y-4">
        <TextareaInput text="Bio" extraDescription="Optional" name="bio" />
        <CheckboxInput text="Interests" extraDescription="2 of 8" options={["Cooking" , "Hiking" , "Reading"]} />
        <AddInterestInput />
      </div>
    </div>
  )
}

export default YourStory
