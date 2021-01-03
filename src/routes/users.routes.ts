import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

interface DeleteOptions {
  delete: undefined;
  password: undefined;
}

/**
 * Vejamos que até agora já trabalhamos com os seguinte
 * conceitos:
 * Repositories
 *
 * Services => Se não houver regra de negócio alguma, podemos
 * utilizar só o Repositório
 */

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRoutes;
