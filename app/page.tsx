import { Suspense } from "react";
import MainPage from "./components/mainPage";

export default function Home() {
    return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200"> 
       <Suspense fallback={<p>Loading product list...</p>}>

        <MainPage />  
      </Suspense>
               
</div>
);
}
 console.log(MainPage);
