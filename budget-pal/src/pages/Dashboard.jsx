//rrd
import { useLoaderData } from "react-router-dom";

//helper functions
import { createBudget, fetchData, wait } from "../helpers"

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
//library 
import { toast } from "react-toastify";


//loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

//action
export async function dashboardAction({ request }) {
    await wait();

    const data = await request.formData();
    //used to be const formData but is now deconstructing from formData
    const {_action, ...values}= Object.fromEntries(data)
 
    if(_action === "newUser") {
        try {
            // throw new Error('Ya done')-- for custom error testing
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        } catch (error) {
            throw new Error("There was a problem creating your account.")
        }
        
    }
    if(_action === "createBudget") {
        try {
            //create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Budget created!")
        } catch (error) {
            throw new Error("There was a problem creating your budget.")
            
        }
    }




}

//everytime we hit the dashboard route we would load any data


const Dashboard = () => {
    //custom hook
    const { userName, budgets } = useLoaderData()
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>

                    <div className="grid-sm">
                        {/* {budgets ? () : ()} */}
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />

                            </div>
                        </div>
                    </div>

                </div>

            ) : <Intro />}
        </>
    )
}
export default Dashboard