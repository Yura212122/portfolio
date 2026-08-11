db.run(`
  CREATE TABLE IF NOT EXISTS blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    title TEXT,
    description TEXT,
    images_json TEXT,
    details_json TEXT
  )
`);
app.get('/blocks', (req, res) => {
  const type = req.query.type;

  let query = 'SELECT * FROM blocks';
  let params = [];

  if (type) {
    query += ' WHERE type = ?';
    params.push(type);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    const formatted = rows.map(row => ({
      id: row.id,
      type: row.type,
      title: row.title,
      description: row.description,
      images: JSON.parse(row.images_json || '[]'),
      details: JSON.parse(row.details_json || '{}'),
    }));

    res.json(formatted);
  });
});
app.post('/blocks', checkAuth, checkAdmin, uploadBlock.array('images', 10), (req, res) => {
  const { type, title, description, details } = req.body;

  if (!type || !title || !description) {
    return res.status(400).json({ message: 'type, title, description required' });
  }

  const images = req.files ? req.files.map(f => `/uploads_blocks/${f.filename}`) : [];

  let detailsObj = {};
  try {
    detailsObj = details ? JSON.parse(details) : {};
  } catch {
    detailsObj = {};
  }

  db.run(
    `INSERT INTO blocks (type, title, description, images_json, details_json)
     VALUES (?, ?, ?, ?, ?)`,
    [
      type,
      title,
      description,
      JSON.stringify(images),
      JSON.stringify(detailsObj)
    ],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });

      res.json({
        message: 'Block created',
        id: this.lastID,
        type,
        images
      });
    }
  );
});
app.put('/blocks/:id', checkAuth, checkAdmin, uploadBlock.array('images', 10), (req, res) => {
  const id = req.params.id;
  const { title, description, details } = req.body;

  const images = req.files ? req.files.map(f => `/uploads_blocks/${f.filename}`) : [];

  let detailsObj = {};
  try {
    detailsObj = details ? JSON.parse(details) : {};
  } catch {
    detailsObj = {};
  }

  db.get('SELECT * FROM blocks WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Not found' });

    const updatedImages =
      images.length > 0
        ? images
        : JSON.parse(row.images_json || '[]');

    const updatedDetails = {
      ...JSON.parse(row.details_json || '{}'),
      description: description || row.description,
      ...detailsObj
    };

    db.run(
      `UPDATE blocks
       SET title = ?, description = ?, images_json = ?, details_json = ?
       WHERE id = ?`,
      [
        title || row.title,
        description || row.description,
        JSON.stringify(updatedImages),
        JSON.stringify(updatedDetails),
        id
      ],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: 'Updated successfully' });
      }
    );
  });
});
app.delete('/blocks/:id', checkAuth, checkAdmin, (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM blocks WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ message: err.message });

    res.json({ message: 'Deleted', changes: this.changes });
  });
});
app.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    res.json(rows.map(row => ({
      id: row.id,
      text: row.text,
      author: row.author,
      created_at: row.created_at,
      images: JSON.parse(row.images_json || '[]')
    })));
  });
});