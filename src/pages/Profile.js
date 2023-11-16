import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useUser } from "../contexts/UserProvider";

// const formLabels = ["First name", "Last name", "Email", "Password"];

// function createName(label) {
//   const splitted = label.split(" ");

//   const name =
//     splitted.length > 1
//       ? `${splitted[0].toLowerCase()}${splitted[1][0].toUpperCase()}${splitted[1].slice(
//           1
//         )}`
//       : splitted[0].toLowerCase();
//   return name;
// }

function Profile() {
  const [image, setImage] = useState("");
  // ⚠️ try to limit the only png/jpeg etc extentions for the file
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const { user } = useUser();
  // const { id: userId } = user;

  // useEffect(() => {
  //   // async function fetchData() {
  //   //   const { data, error } = await supabase.from("profiles").select();
  //   //   console.log(data);
  //   // }
  //   // fetchData();

  //   async function createData() {
  //     const { error } = await supabase.from("profiles").insert({ userId });
  //   }
  //   createData();
  // }, []);

  function handleImageUpload(e) {
    console.log(e.target.files[0]);

    const file = e.target.files;

    if (file && file[0]) {
      setImage(file[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const { error } = await supabase
        .from("profiles")
        .insert({ firstName, lastName, country });

      if (error) throw new Error(`Something went wrong: ${error.message}`);

      alert("Added");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setFirstName("");
      setLastName("");
      setCountry("");
    }
  }

  // 💡 add more fields later
  return (
    <div className="bg-white w-9/12 mx-auto">
      <h2 className="text-xl font-medium mb-3">Profile Settings</h2>

      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <div>
          <label>Profile picture</label>
          <input type="file" name="profile" onChange={handleImageUpload} />
        </div>

        <label className="flex flex-col">
          First name
          <input
            className="rounded-lg px-2 py-1 border border-gray-100 text-current"
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          Last name
          <input
            className="rounded-lg px-2 py-1 border border-gray-100 text-current"
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          Which country are you based out of?
          <input
            className="rounded-lg px-2 py-1 border border-gray-100 text-current"
            type="text"
            name="country"
            value={country}
            placeholder="Enter the country you are based out of"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        {/* 💡 email and password are for account setting */}
        {/* <label className="flex flex-col">
          Email
          <input
            className="rounded-lg px-2 py-1 border border-gray-100 text-current"
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          Password
          <input
            className="rounded-lg px-2 py-1 border border-gray-100 text-current"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> */}

        <button>Save</button>
      </form>
    </div>
  );
}

export default Profile;
