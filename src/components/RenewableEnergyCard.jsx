import React, { useState } from 'react';
import Detail from './Detail';
import './Resources.css';

const RenewableEnergyCard = ({ title, description, image , index }) => {
    const [showDetail , setShowDetail] = useState(false);
    const handleLearnMore=()=>{
      setShowDetail(!showDetail);
    }
    const renewableEnergyResources = [
      {
        type: "Solar Energy",
        stepByStepGuide: {
          1: "Research eligibility criteria and identify the solar energy project you want to implement.",
          2: "Select a certified service provider with experience in solar energy projects.",
          3: "Plan your project with the service provider, including system design and cost estimation.",
          4: "Apply for subsidies from the Indian government by submitting required documents.",
          5: "Implement your solar energy project with the approved subsidy.",
          6: "Comply with regulations and reporting requirements.",
          7: "Claim subsidy upon successful project implementation."
        },
        governmentProvider: "Ministry of New and Renewable Energy (MNRE)",
        privateProviders: [
          "Tata Power Solar",
          "Azure Power",
          "Vikram Solar"
        ],
        financialSubsidies: "Subsidies offered by MNRE include capital subsidy, interest subsidy, and generation-based incentives (GBI) for grid-connected solar power projects."
      },
      {
        type: "Wind Energy",
        stepByStepGuide: {
          1: "Research eligibility criteria and select the wind energy project.",
          2: "Choose a certified service provider with expertise in wind energy projects.",
          3: "Plan the project including turbine selection and site assessment.",
          4: "Apply for subsidies from the Indian government.",
          5: "Implement the project with the approved subsidy.",
          6: "Ensure compliance with regulations.",
          7: "Claim subsidy after successful project implementation."
        },
        governmentProvider: "Ministry of New and Renewable Energy (MNRE)",
        privateProviders: [
          "Suzlon Energy",
          "Inox Wind"
        ],
        financialSubsidies: "MNRE offers capital subsidy and fiscal incentives for grid-connected and off-grid wind power projects."
      },
      {
        type: "Rainwater Harvesting",
        stepByStepGuide: {
          1: "Research eligibility criteria and determine the rainwater harvesting project scope.",
          2: "Select a service provider experienced in rainwater harvesting systems.",
          3: "Plan the project including system design and implementation.",
          4: "Apply for subsidies from relevant government agencies.",
          5: "Implement the project as per approved plans.",
          6: "Adhere to regulatory requirements.",
          7: "Claim subsidies upon successful project completion."
        },
        governmentProvider: "Ministry of Jal Shakti",
        privateProviders: [
          "Watershed India",
          "Aquapot"
        ],
        financialSubsidies: "Financial assistance for rainwater harvesting projects may include grants and subsidies from the Ministry of Jal Shakti and local authorities."
      },
      {
        type: "Bio Gas Plants",
        stepByStepGuide: {
          1: "Research eligibility criteria and determine the biogas plant project scope.",
          2: "Select a certified service provider with experience in biogas plants.",
          3: "Plan the project including plant design and cost estimation.",
          4: "Apply for subsidies from the Indian government.",
          5: "Implement the biogas plant project with the approved subsidy.",
          6: "Ensure compliance with regulations and safety standards.",
          7: "Claim subsidy upon successful project implementation."
        },
        governmentProvider: "Ministry of New and Renewable Energy (MNRE)",
        privateProviders: [
          "Bajaj Bio-Tech",
          "Mailhem Ikos Environment Pvt. Ltd.",
          "ATC Envirotech"
        ],
        financialSubsidies: "MNRE offers subsidies and incentives for biogas plants, including capital subsidies and financial assistance for small, medium, and large-scale biogas projects."
      },
      {
        type: "Hydropower",
        stepByStepGuide: {
          1: "Research eligibility criteria and select the hydropower project.",
          2: "Choose a certified service provider with expertise in hydropower projects.",
          3: "Plan the project including site assessment and design.",
          4: "Apply for subsidies from the Indian government.",
          5: "Implement the hydropower project with the approved subsidy.",
          6: "Ensure compliance with environmental and regulatory standards.",
          7: "Claim subsidy after successful project implementation."
        },
        governmentProvider: "Ministry of Power",
        privateProviders: [
          "NHPC Limited",
          "SJVN Limited",
          "Tata Power"
        ],
        financialSubsidies: "The Indian government offers financial incentives and subsidies for small and large hydropower projects, including capital grants and low-interest loans."
      },
      {
        type: "Biomass Energy",
        stepByStepGuide: {
          1: "Research eligibility criteria and determine the biomass energy project scope.",
          2: "Select a certified service provider with experience in biomass energy projects.",
          3: "Plan the project including system design and cost estimation.",
          4: "Apply for subsidies from the Indian government.",
          5: "Implement the biomass energy project with the approved subsidy.",
          6: "Ensure compliance with environmental and safety regulations.",
          7: "Claim subsidy upon successful project implementation."
        },
        governmentProvider: "Ministry of New and Renewable Energy (MNRE)",
        privateProviders: [
          "Thermax Limited",
          "Vikram Biomass Energy",
          "Pinnacle Renewable Energy"
        ],
        financialSubsidies: "MNRE provides financial assistance and subsidies for biomass energy projects, including capital subsidies and fiscal incentives."
      },
      {
        type: "Geothermal Energy",
        stepByStepGuide: {
          1: "Research eligibility criteria and identify the geothermal energy project.",
          2: "Select a certified service provider with expertise in geothermal energy projects.",
          3: "Plan the project including site assessment and system design.",
          4: "Apply for subsidies from the Indian government.",
          5: "Implement the geothermal energy project with the approved subsidy.",
          6: "Ensure compliance with regulations and safety standards.",
          7: "Claim subsidy upon successful project implementation."
        },
        governmentProvider: "Ministry of New and Renewable Energy (MNRE)",
        privateProviders: [
          "GeoSyndicate Power Pvt. Ltd.",
          "Tata Power",
          "Thermax Limited"
        ],
        financialSubsidies: "MNRE offers financial support and incentives for geothermal energy projects, including capital subsidies and grants for research and development."
      }
    ];
    
    return (
      <div className="renewable-energy-card">
        <img src={image} alt={title} className="renewable-energy-image" />
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="learn-more-button" onClick={()=>handleLearnMore(index)}>Learn More</button>
        {showDetail && <Detail data={renewableEnergyResources[index]} />}
      </div>
    );
  }
export default RenewableEnergyCard;