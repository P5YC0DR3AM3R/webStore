const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  })
  .then(tags => res.json(tags))
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// GET one tag by id
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag }]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// POST new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tag => res.status(201).json(tag))
  .catch(err => {
    console.error(err);
    res.status(400).json(err);
  });
});

// PUT update tag
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(num => {
    if (num == 1) {
      res.json({
        message: "Tag was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Tag with id=${req.params.id}. Maybe Tag was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Error updating Tag with id=" + req.params.id
    });
  });
});

// DELETE a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then(num => {
    if (num == 1) {
      res.json({
        message: "Tag was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Tag with id=${req.params.id}. Maybe Tag was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Could not delete Tag with id=" + req.params.id
    });
  });
});

module.exports = router;
