import HeaderSectionCategory from "../components/Recycling/HeaderSectionCategory";



function CleansingPage() {

  return (
    <div>
      <HeaderSectionCategory
      categoryName= "Cleansing"
      categoryBio= "촉촉한 피부를 만들어 보세요."
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
