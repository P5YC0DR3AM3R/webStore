const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [{ model: Product }]
  })
  .then(categories => res.json(categories))
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// GET one category by id
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  })
  .then(category => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// POST new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(category => res.status(201).json(category))
  .catch(err => {
    console.error(err);
    res.status(400).json(err);
  });
});

// PUT update category
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Category was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Category with id=${req.params.id}. Maybe Category was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Category with id=" + req.params.id
    });
  });
});

// DELETE a category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Category was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Category with id=${req.params.id}. Maybe Category was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Category with id=" + req.params.id
    });
  });
});

module.exports = router;
