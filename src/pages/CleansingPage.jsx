import HeaderSectionCategory from "../components/Recycling/HeaderSectionCategory";



function CleansingPage() {

  return (
    <div>
      <HeaderSectionCategory
      categoryName= "Cleansing"
      categoryBio= "피부가 원하는 맑음을 선물해 보세요."
      jsonFile="/Cleansing.json"
      arrayName= "Cleansing"
      bestSliderFile= "/BestSliderCleansing.json"
      bestSliderArray= "BestSliderCleansing"
      basePath= "cleansing"
      />
    </div>
  )

  }

export default CleansingPage;
