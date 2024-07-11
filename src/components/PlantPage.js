import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleToggleSoldOut = (id) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        const updatedPlant = { ...plant, soldOut: !plant.soldOut };

        fetch(`http://localhost:6001/plants/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ soldOut: !plant.soldOut })
        })
        .then(response => response.json())
        .then(() => {
          setPlants(plants.map(p => p.id === id ? updatedPlant : p));
        })
        .catch(error => console.error("Error updating plant:", error));

        return updatedPlant;
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;








