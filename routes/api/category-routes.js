const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {model: Product}
    });
    res.status(200).json(categories)
  } catch (err) { 
    res.status(500).json(err)  
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: {model: Product}
    });

    if (!categories) {
      res.status(404).json({message: 'No products found with this id!'})
    }
  } catch(err){
    res.status(500).json(err)
  }
  
});

router.post ('/', async (req, res) => {
  // create a new category
  try {
   const newCategory = Category.create({
      category_name: req.body.name
    })
    res.json(newCategory)
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
  const updateCategory = Category.update({
    category_name: req.body.name,
  },
  {
    where:{
      id: req.params.id,
    }
  })
  res.json(updateCategory)
  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deleteCategory)
  } catch (err){
    res.json(err)
  }
});

module.exports = router;
