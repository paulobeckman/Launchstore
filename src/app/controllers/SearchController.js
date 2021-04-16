const Product = require('../models/Product')
const LoadProductsService = require('../services/LoadProductService')


module.exports = {
    async index(req, res){
        try{
            let { filter, category } = req.query

            if(!filter || filter.toLowerCase() == 'toda a loja') filter = null

            let products = await Product.search({filter, category})

            const productPromise = products.map(LoadProductsService.format)

            products = await Promise.all(productPromise)

            const search = {
                tern: filter || 'Toda a loja',
                total: products.length
            }

            const categories = products.map(product => ({
                id:product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {

                const found = categoriesFiltered.some(cat => cat.id == category.id)

                if (!found)
                    categoriesFiltered.push(category)

                return categoriesFiltered
            }, [])

            return res.render("search/index", {products, search, categories})
            
        }
        catch(err){
            console.log(err)
        }

    }
}