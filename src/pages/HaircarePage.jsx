import HeaderSectionCategory from "../components/Recycling/HeaderSectionCategory";

function HaircarePage() {

  return (
    <div>
    <HeaderSectionCategory 
      categoryName= "Haircare"
      categoryBio= "자신감 넘치는 머릿결을 경험해보세요."
      jsonFile="/Haircare.json"
      arrayName= "Haircare"
      bestSliderFile= "/BestSliderHaircare.json"
      bestSliderArray= "BestSliderHaircare"
      basePath= "haircare"
      />
    </div>
  )

}

export default HaircarePage;
