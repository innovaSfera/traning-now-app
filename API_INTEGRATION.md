# API Integration - Training Now

Este documento descreve como usar a integração da API no projeto Training Now.

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   ├── axios.ts          # Configuração do Axios
│   └── constants.ts      # Constantes e endpoints da API
├── types/
│   └── api.ts           # Interfaces e tipos TypeScript
├── services/
│   ├── auth.ts          # Serviços de autenticação
│   ├── api.ts           # Serviços genéricos
│   └── index.ts         # Barrel exports
├── hooks/
│   └── useAuth.ts       # Hook personalizado para autenticação
└── examples/
    └── login-example.tsx # Exemplo de implementação
```

## 🚀 Como Usar

### 1. Importações Básicas

```typescript
import { AuthService, ApiService } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import type { PrestadorLoginRequestDto } from "@/services";
```

### 2. Autenticação

#### Usando o Hook useAuth (Recomendado)
```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, logout, isAuthenticated, user, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: "user@example.com",
        PassUser: "password",
        userName: "username"
      });
      console.log("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bem-vindo, {user?.userName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Entrando..." : "Login"}
        </button>
      )}
    </div>
  );
}
```

#### Usando Diretamente o AuthService
```typescript
import { AuthService } from "@/services";

// Login
const loginData = {
  email: "user@example.com",
  PassUser: "password123",
  userName: "username"
};

const response = await AuthService.loginPrestador(loginData);

// Verificar se está autenticado
const isAuth = AuthService.isAuthenticated();

// Obter dados do usuário atual
const currentUser = AuthService.getCurrentUser();

// Logout
await AuthService.logout();
```

### 3. Registro de Usuário

```typescript
import { AuthService, type RegisterUserRequest } from "@/services";

const registerData: RegisterUserRequest = {
  email: "newuser@example.com",
  password: "password123",
  userName: "newuser",
  fullName: "Nome Completo",
  role: "trainer", // ou "client"
  // ... outros campos opcionais
};

try {
  const response = await AuthService.registerPrestador(registerData);
  console.log("Usuário registrado com sucesso!", response);
} catch (error) {
  console.error("Erro no registro:", error);
}
```

### 4. Requisições Genéricas

```typescript
import { ApiService } from "@/services";

// GET
const data = await ApiService.get("/some-endpoint", { param1: "value" });

// POST
const response = await ApiService.post("/some-endpoint", { data: "value" });

// PUT
const updateResponse = await ApiService.put("/some-endpoint/1", { data: "updated" });

// DELETE
await ApiService.delete("/some-endpoint/1");
```

## 🔧 Configuração

### Variáveis de Ambiente (Opcional)

Você pode sobrescrever as URLs padrão criando um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL_PROD=https://your-production-api.com/api
NEXT_PUBLIC_API_URL_DEV=http://localhost:5286/api
```

E então atualizar `src/lib/constants.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: {
    PRODUCTION: process.env.NEXT_PUBLIC_API_URL_PROD || "https://traning-now-api-h9b4a0b0duc6cjaq.eastus2-01.azurewebsites.net/api",
    DEVELOPMENT: process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:5286/api",
  },
  // ...
};
```

## 🛡️ Interceptadores

### Autenticação Automática
O token de autenticação é automaticamente incluído em todas as requisições quando disponível.

### Tratamento de Erros
- **401 (Unauthorized)**: Remove token e redireciona para login
- **Outros erros**: Logados no console para debug

## 📝 Tipos TypeScript

Todos os tipos estão disponíveis em `@/types/api`:

```typescript
import type {
  PrestadorLoginRequestDto,
  RegisterUserRequest,
  TokenResponseDto,
  UserModelResponseDto,
  ApiResponse,
  ApiError
} from "@/types/api";
```

## 🔄 Próximos Passos

1. **Implementar mais endpoints** conforme necessário no `API_ENDPOINTS`
2. **Criar hooks específicos** para diferentes entidades (training, clients, etc.)
3. **Adicionar cache** usando React Query ou SWR
4. **Implementar refresh token** se a API suportar
5. **Adicionar testes unitários** para os serviços

## 📚 Exemplos Completos

Veja o arquivo `src/examples/login-example.tsx` para implementações completas de uso.

---

**Importante:** Lembre-se de que o localStorage só está disponível no cliente. Os serviços já lidam com isso verificando `typeof window !== "undefined"`.