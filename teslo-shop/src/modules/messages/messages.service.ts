import { BadRequestException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesService {
  constructor(private readonly usersService: UsersService) {}

  private connectedClients: ConnectedClients = {};

  async registerClient(client: Socket, userId: string) {
    const user = await this.usersService.findOne(userId);

    if (!user.isActive) {
      throw new BadRequestException('This user is not active.');
    }

    this.findAndDeleteDuplicatedUser(user.id);

    this.connectedClients[client.id] = {
      socket: client,
      user,
    };
  }

  unregisterClient(client: Socket) {
    client.disconnect();
    delete this.connectedClients[client.id];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients);
  }

  findAndDeleteDuplicatedUser(userId: string) {
    const socket = this.findSocketByUserId(userId);

    if (socket) {
      this.unregisterClient(socket);
    }
  }

  findUserBySocketId(socketId: string) {
    return this.connectedClients[socketId]?.user;
  }

  findSocketByUserId(userId: string) {
    return Object.values(this.connectedClients).find(
      (client) => client.user.id === userId,
    )?.socket;
  }
}
