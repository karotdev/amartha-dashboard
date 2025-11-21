describe('DB', () => {
  it('should return departments data', async () => {
    const data = await fetch('http://localhost:4001/departments');
    const json = await data.json();
    expect(json).toEqual([
      { id: 1, name: 'Lending' },
      { id: 2, name: 'Funding' },
      { id: 3, name: 'Operations' },
      { id: 4, name: 'Engineering' },
    ]);
  });

  it('should return locations data', async () => {
    const data = await fetch('http://localhost:4002/locations');
    const json = await data.json();
    expect(json).toEqual([
      { id: 1, name: 'Jakarta' },
      { id: 2, name: 'Depok' },
      { id: 3, name: 'Surabaya' },
    ]);
  });
});
