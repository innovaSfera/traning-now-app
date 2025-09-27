# 🏫 **ClassRoom Service - Documentação**

## 📋 **Arquivos Criados:**

### 🔧 **Tipos TypeScript:**
- `src/types/classroom.ts` - Interfaces e tipos para ClassRoom, Aluno, Treino, Personal

### 🌐 **Serviços:**
- `src/services/classroom.ts` - ClassRoomService com todos os métodos CRUD

### 🎣 **Hooks:**
- `src/hooks/useClassRoom.ts` - Hook personalizado para gerenciar estado das salas

### 📚 **Exemplos:**
- `src/examples/classroom-example.tsx` - Exemplo completo de uso

### ⚙️ **Configuração:**
- `src/lib/constants.ts` - Endpoints atualizados
- `src/services/index.ts` - Exports atualizados

---

## 🚀 **Funcionalidades Implementadas:**

### ✅ **CRUD Completo:**
- ✅ **GET** - Buscar todas as salas (`getAllClassRooms`)
- ✅ **GET** - Buscar salas filtradas (`getAllClassRoomsFilter`)
- ✅ **GET** - Buscar sala por ID (`getClassRoomById`)
- ✅ **POST** - Criar nova sala (`createClassRoom`)
- ✅ **PUT** - Atualizar sala (`updateClassRoom`)
- ✅ **DELETE** - Desativar sala (`disableClassRoom`)

### 🔍 **Funcionalidades Extras:**
- ✅ Verificar se sala existe (`classRoomExists`)
- ✅ Buscar salas por aluno (`getClassRoomsByAluno`)
- ✅ Buscar salas por personal (`getClassRoomsByPersonal`)
- ✅ Buscar apenas salas ativas (`getActiveClassRooms`)

### 🎯 **Hook Personalizado:**
- ✅ Estados reativo para salas
- ✅ Loading e error handling
- ✅ Métodos para todas as operações CRUD
- ✅ Cache local das salas

---

## 💻 **Como Usar:**

### 1. **Importação:**
```typescript
import { ClassRoomService, useClassRoom } from "@/services";
```

### 2. **Usando o Hook (Recomendado):**
```typescript
const {
  classRooms,
  isLoading,
  error,
  fetchAllClassRooms,
  createClassRoom,
  updateClassRoom,
  disableClassRoom
} = useClassRoom();
```

### 3. **Usando o Serviço Direto:**
```typescript
// Buscar todas as salas
const rooms = await ClassRoomService.getAllClassRooms();

// Criar nova sala
const newRoom = await ClassRoomService.createClassRoom({
  nome: "Sala 01",
  alunoId: "aluno-123",
  personalId: "personal-456"
});

// Atualizar sala
const updated = await ClassRoomService.updateClassRoom({
  id: "room-123",
  nome: "Sala Atualizada"
});

// Desativar sala
await ClassRoomService.disableClassRoom("room-123");
```

---

## 🔌 **Endpoints da API:**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/ClassRoom/GetAllClassRoom` | Buscar todas as salas |
| POST | `/ClassRoom/RegisterClassRoom` | Cadastrar nova sala |
| GET | `/ClassRoom/GetClassRoomId?id=xxx` | Buscar sala por ID |
| PUT | `/ClassRoom/UpdateClassRoom` | Atualizar sala |
| PUT | `/ClassRoom/DesableClassRoom/{id}` | Desativar sala |

---

## 🏗️ **Estrutura dos Dados:**

### **ClassRoom:**
```typescript
{
  id?: string;
  nome?: string;
  alunoId?: string;
  personalId?: string;
  treinoId?: string;
  dataCadastro?: Date;
  // ... outros campos de auditoria
  
  // Relacionamentos
  aluno?: Aluno;
  treino?: Treino;
  personal?: Personal;
}
```

### **Aluno:**
```typescript
{
  id?: string;
  nome?: string;
  email?: string;
  idade?: number;
  altura?: number;
  peso?: number;
  imc?: number;
  sexo?: Gender;
  // ... outros campos
}
```

---

## 🧪 **Para Testar:**

1. **Execute o projeto:**
   ```bash
   npm run dev
   ```

2. **Use o exemplo:**
   ```typescript
   import { ClassRoomService } from "@/services";
   
   const rooms = await ClassRoomService.getAllClassRooms();
   console.log("Salas:", rooms);
   ```

3. **Ou use o hook em um componente:**
   ```typescript
   const { classRooms, fetchAllClassRooms } = useClassRoom();
   
   useEffect(() => {
     fetchAllClassRooms();
   }, []);
   ```

---

## ✅ **Status:**
- 🎯 **Compilação:** ✅ Sucesso
- 🔧 **TypeScript:** ✅ Tipagem completa
- 🌐 **API:** ✅ Integração pronta
- 📱 **Hook:** ✅ Estado reativo
- 📚 **Documentação:** ✅ Completa

**🚀 Pronto para uso em produção!**