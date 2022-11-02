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
    const newCategory = await Category.create({
      category_name: req.body.name
    })
    res.json({message:`${req.body.name} has been added`})
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
  const updateCategory = await Category.update({
    category_name: req.body.name,
  },
  {
    where:{
      id: req.params.id,
    }
  })
  res.json({message:`Category name for id No:${req.params.id} has been updated with ${req.body.name}`})
  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({message:`id No:${req.params.id} has been deleted`})
  } catch (err){
    res.json(err)
  }
});

module.exports = router;
