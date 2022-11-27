import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {

  public async home({ view }: HttpContextContract){
    return view.render('home')
  }

  

}
