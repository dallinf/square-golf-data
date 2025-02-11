interface Props {
  selectedClub: string;
  uniqueClubs: string[];
  onChange: (club: string) => void;
}

export function ClubFilter({ selectedClub, uniqueClubs, onChange }: Props) {
  return (
    <div className="mb-6">
      <label htmlFor="clubFilter" className="mr-2">
        Filter by Club:
      </label>
      <select
        id="clubFilter"
        value={selectedClub}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="all">All Clubs</option>
        {uniqueClubs.map((club) => (
          <option key={club} value={club}>
            {club}
          </option>
        ))}
      </select>
    </div>
  );
}
