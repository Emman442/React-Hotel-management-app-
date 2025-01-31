import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

 
  return (
    <>
     <Row type="horizontal">
       <Heading as="h1">All cabins</Heading>
       <p>TEST</p>
     </Row>

    <Row>
      <CabinTable></CabinTable>
      <Button onClick={()=>setShowForm((show)=> !show)}>Add New Cabin</Button>
      {showForm && <CreateCabinForm/>}
    </Row>

    </>

  );
}

export default Cabins;
