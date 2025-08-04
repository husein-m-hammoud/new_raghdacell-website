import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Requirements = ({
  data,
  formData,
  setFormData,
  handleChangeInput,
  loadingPlayer,
  content,
  handleSubmitPlayer,
  dataPlayer,
  player_numbers
}) => {
  const [requirementsData, setRequirementsData] = useState("");
  let player_number = null;

  // useEffect(() => {
  //   console.log('enter', )
  //   if(formData?.player_id){
  //       setFormData({
  //           ...formData,
  //           player_number: formData.player_id
  //         });

  //   }
  //   if(formData?.playerId){
  //     setFormData({
  //         ...formData,
  //         player_number: formData.playerId
  //       });
  //     }
  //   if(formData?.id){
  //     setFormData({
  //         ...formData,
  //         player_number: formData.id
  //       });
  //     }

  
  //   console.log({formData})
  // },[formData?.player_id, formData?.id, formData?.playerId])

  useEffect(() => {
    console.log('enter');
  
    let parsedPlayerNumbers = [];
  
    try {
      parsedPlayerNumbers = JSON.parse(player_numbers); // Parse the JSON string
    } catch (error) {
      console.error("Error parsing player_numbers:", error);
      
    }
  
    if (Array.isArray(parsedPlayerNumbers) && parsedPlayerNumbers.length > 0) {
      const foundKey = parsedPlayerNumbers.find(key => formData?.[key] !== undefined);
      
      if (foundKey) {
        player_number = formData[foundKey]

      }
    }
  
    console.log({ formData });
  }, [player_numbers, formData]);
  

  useEffect(() => {
    if(data?.requirements) {
        setRequirementsData(JSON.parse(data.requirements))
    }
  }, [data?.requirements]);

  if (!requirementsData) {
    console.log("hussein requirements false");
    return null;
  }
  const renderRequirements = () => {
    return requirementsData.map((item, index) => (
      <div className="flex flex-col requirements" key={`req${index}`}>
        <span>{item?.label}</span>
        <input
          type="text"
          name={item?.name}
          value={formData[item?.name]}
          onChange={handleChangeInput}
          required = {true}
          className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
          placeholder={item?.name == 'player_id' ? content.EnterThePlayerNumber : `Enter the ${item?.label} `}
        />
      </div>
    ));
  };
  console.log({ requirementsData });
  return (
    <>
    {renderRequirements()}
      {data?.th_party_api_id && !data?.require_player_number && !data?.th_party_as7ab_api && (
        <>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span>{content.PlayerName}</span>
              <div className="flex items-center justify-between border-2 border-Pink p-1 cursor-pointer rounded-md w-fit mt-1 text-end">
                <p
                  className="relative"
                  onClick={() =>
                    handleSubmitPlayer(
                      "th-p-apis/" +
                        data?.th_party_api_id +
                        "?number=" +
                        player_number,
                      "",
                      true
                    )
                  }
                >
                  {loadingPlayer ? "Loading...." : content.searchPlayer}
                </p>
                <CiSearch size={20} />
              </div>
            </div>
            <div className="w-full py-5 px-4 outline-none border border-[#707070] mt-3  rounded-xl">
              {dataPlayer?.data?.data?.username ||
                dataPlayer?.data?.msg ||
                dataPlayer?.data?.message}
            </div>
          </div>
        </>
      )}
      {!data?.require_player_number && data?.th_party_as7ab_api  &&(
        <>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span>{content.PlayerName}</span>
              <div className="flex items-center justify-between border-2 border-Pink p-1 cursor-pointer rounded-md w-fit mt-1 text-end">
                <p
                  className="relative"
                  onClick={() =>
                    handleSubmitPlayer(
                        "automated/get/player/name/"+player_number+"/"+data?.th_party_as7ab_api,
                      "",
                      true
                    )
                  }
                >
                  {loadingPlayer ? "Loading...." : content.searchPlayer}
                </p>
                <CiSearch size={20} />
              </div>
            </div>
            <div className="w-full py-5 px-4 outline-none border border-[#707070] mt-3  rounded-xl">
              {dataPlayer?.data?.data?.username ||
                dataPlayer?.data?.msg ||
                dataPlayer?.data?.message}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Requirements;
