# Camera State & UI Data Flow

## 1) Data Ingestion & Core Camera Stores

- **Sensors API** runs every **30 seconds**.
- API updates flow into **`useAllCameraStore`**.
- `useAllCameraStore` processing loop:
  - Runs `computeClusterIndices`.
  - Produces **`cluster_indices`** (computed on first load, or when view / `sensor_rel` changes).
  - **Default rule for `cluster_indices`:**
    - If `view === "top"` → `cluster_indices = [cam_idx]` (self camera index)
    - Else → `cluster_indices = []`
- Filtered data is fed into **`useCameraFilterStore`**:
  - Handles add/remove operations based on active camera filters.

---

## 2) Feature-Specific Zustand Stores

- **`useLiveStore`** → real-time live view state.
- **`useArgusStore`** → incoming **new calibration** + **camera state** (preview-like state).
- **`useDesignStore`** → design/canvas layer configuration state.

---

## 3) UI Component Subscriptions & Mapping

### TreeClub / Home Page (Root Consumer)

Subscribes to:
- `useLiveStore`
- `useArgusStore`
- `useDesignStore`

### Camera Marker Layer

Subscribes to:
- `useLiveStore`
- `useArgusStore`

Uses combined operational state to render viewport markers.

### Design Canvas Layer

Subscribes to:
- `useDesignStore`

Handles layout grids and admin editing flows.

---

## 4) React Coordination Rule (Cross-Store Syncer)

For each store connection:
- Use a dedicated setup with an `updateStore` function.
- Trigger updates conditionally on **`FilterChange`**.
- Use Zustand **shallow equality** for selected state slices to avoid unnecessary re-renders.

---

## Flow Diagram (Mermaid)

```mermaid
flowchart TD
    A[Sensors API\n(Every 30 sec)] --> B[useAllCameraStore]
    B --> C[computeClusterIndices]
    C --> D[cluster_indices output]
    D --> D1{view === top?}
    D1 -->|Yes| D2[cluster_indices = [cam_idx]]
    D1 -->|No| D3[cluster_indices = []]

    D2 --> E[useCameraFilterStore\n(apply active filters)]
    D3 --> E

    E --> F[useLiveStore\n(real-time state)]
    E --> G[useArgusStore\n(incoming calibration + camera preview state)]
    E --> H[useDesignStore\n(canvas config)]

    F --> I[TreeClub / Home Page]
    G --> I
    H --> I

    F --> J[Camera Marker Layer]
    G --> J

    H --> K[Design Canvas Layer]

    L[FilterChange] --> M[Cross-store updateStore trigger]
    M --> F
    M --> G
    M --> H

    N[Zustand shallow equality] --> I
    N --> J
    N --> K
```

---

## React-Related Notes

1. Root-level multi-store subscription in Home/TreeClub can increase render frequency.
2. `FilterChange`-gated updates are important to prevent cross-store update churn.
3. Use `shallow` selectors consistently for render stability.
4. Keep cross-store sync directional to avoid circular update paths.
5. Deterministic `cluster_indices` defaults (`top` → `[cam_idx]`, else `[]`) help prevent preview/marker flicker.
