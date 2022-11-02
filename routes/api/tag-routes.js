const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: {model: Product}
    });
    res.status(200).json(tags)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: {model: Product, through: ProductTag, as: 'product'}
    });
  
    if (!tagData) {
      res.status(404).json({message: 'no tags with id found'})
    }
    res.status(200).json(tagData)
   } catch (err) {
    console.log(err)
    res.status(500).json(err)
   }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.name
    })
    res.json({message:`${req.body.name} has been added`})
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatetag = await Tag.update({
      tag_name: req.body.name,
    },
    {
      where:{
        id: req.params.id,
      }
    })
    res.json({message:`Tag name for id No:${req.params.id} has been updated with ${req.body.name}`})
    } catch (err) {
      res.json(err)
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
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
