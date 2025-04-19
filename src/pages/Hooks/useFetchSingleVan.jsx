import React from "react"

export function useFetchSingleVan(id, setState) {
        React.useEffect(() => {
        fetch(`/api/vans/${id}`)
            .then(res => res.json())
            .then(data => setState(data.vans))
    }, [id])
}