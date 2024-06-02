import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dtos/message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@/modules/auth/interfaces/JwtPayload';

@WebSocketGateway({ cors: true, namespace: 'messages' })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  wss: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesService.registerClient(client, payload.id);
      this.clientsUpdatedEvent();
    } catch (err) {
      client.disconnect();
      return;
    }
  }

  handleDisconnect(client: Socket) {
    this.messagesService.unregisterClient(client);

    this.clientsUpdatedEvent();
  }

  clientsUpdatedEvent() {
    this.wss.emit(
      'clients-updated',
      this.messagesService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message')
  handleMessageFromClient(client: Socket, payload: MessageDto) {
    const user = this.messagesService.findUserBySocketId(client.id);

    this.wss.emit('message-from-server', {
      fullName: user.fullName,
      message: payload.message || 'Hello from the server!',
    });
  }
}
