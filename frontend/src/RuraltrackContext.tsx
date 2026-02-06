    import React, { createContext, useState, useContext, useEffect } from 'react';


    export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [animais, setAnimais] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);

    // BUSCAR DADOS (SELECT * FROM animais)
    useEffect(() => {
        fetch('SUA_API_URL/animais')
        .then(res => res.json())
        .then(data => {
            setAnimais(data);
            setLoading(false);
        });
    }, []);

  
    const addAnimal = async (animal: Omit<Animal, 'id'>) => {
        const response = await fetch('SUA_API_URL/animais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal)
        });
        const novoAnimal = await response.json();
        setAnimais(prev => [...prev, novoAnimal]);
    };

    // ATUALIZAR (UPDATE)
    const updateAnimal = async (animal: Animal) => {
        await fetch(`SUA_API_URL/animais/${animal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal)
        });
        setAnimais(prev => prev.map(a => a.id === animal.id ? animal : a));
    };

    // DELETAR (DELETE)
    const deleteAnimal = async (id: number) => {
        await fetch(`SUA_API_URL/animais/${id}`, { method: 'DELETE' });
        setAnimais(prev => prev.filter(a => a.id !== id));
    };

    return (
        <FarmContext.Provider value={{ animais, addAnimal, updateAnimal, deleteAnimal, loading }}>
        {children}
        </FarmContext.Provider>
    );
    };