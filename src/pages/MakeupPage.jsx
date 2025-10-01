import HeaderSectionCategory from "../components/Recycling/HeaderSectionCategory";

function MakeupPage() {

  return (
    <div>
      <HeaderSectionCategory 
      categoryName= "Makeup"
      categoryBio= "가장 빛나는 나를 완성해 보세요."
      jsonFile="/Makeup.json"
      arrayName= "Makeup"
      bestSliderFile= "/BestSliderMakeup.json"
      bestSliderArray= "BestSliderMakeup"
      basePath= "makeup"
      />
    </div>
  )

}

export default MakeupPage;
