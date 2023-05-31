
import Parent from "../components/checklistParent";
import {initialTabs}  from "../components/tabList";


const ChecklistPage = () => {
    return (
        <div>
            {/* {console.log(initialTabs)} */}
        <Parent tabs = {initialTabs}/>
        </div>
    );
    }

export default ChecklistPage;