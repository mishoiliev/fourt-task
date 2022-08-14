import { AppBar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Country } from "country-state-city";
import Select from "react-select";

interface SelectedOptionsProps {
  label: string;
  value: { lat: string; long: string; code: string };
}

const selectOptions: SelectedOptionsProps[] = [];

Country.getAllCountries().map((city) => {
  selectOptions.push({
    label: city.name,
    value: { code: city.isoCode, lat: city.latitude, long: city.longitude },
  });
});

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  control: (provided: any) => ({
    ...provided,
    color: "black",
  }),
};

interface Props {
  setNewCountry: (value: any) => void;
}

const SearchAppBar: React.FC<Props> = ({ setNewCountry }) => {
  const [selected, setSelected] = useState<any>();

  return (
    <AppBar
      position="static"
      style={{
        marginBottom: "60px",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNewCountry(selected.value);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <div style={{ width: "33%", color: "#fff" }}>
          <Select
            options={selectOptions}
            styles={customStyles}
            onChange={(newValue) => setSelected(newValue)}
            placeholder={"Select country..."}
          />
        </div>
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "white" }} />
        </IconButton>
      </form>
    </AppBar>
  );
};

export default SearchAppBar;
