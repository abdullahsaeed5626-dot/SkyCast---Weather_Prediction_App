import { LocateFixed, Search } from "lucide-react";
import type { SubmitEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onLocationRequest: () => void;
  loading: boolean;
}

function SearchBar({
  value,
  onChange,
  onSubmit,
  onLocationRequest,
  loading,
}: SearchBarProps) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <Search size={20} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search city..."
          aria-label="Search city"
        />
      </div>
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
      <button
        type="button"
        className="location-button"
        onClick={onLocationRequest}
        title="Use my location"
        aria-label="Use my current location"
      >
        <LocateFixed size={20} />
      </button>
    </form>
  );
}

export default SearchBar;
