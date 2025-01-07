import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Navigate, useLocation } from "react-router"
import { FC, ReactNode } from "react"
import { Roles } from "@/types"
import { setProfileActiveMode } from "@/app/features"
import { toast } from "@/hooks/shadcn-ui"

interface ProtectorProps {
  roles: Roles[]
  children: ReactNode
}

export const Protector: FC<ProtectorProps> = ({ roles = [], children }) => {
  const location = useLocation()

  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.authentication.user)

  const activeMode = useAppSelector(
    (state) => state.authentication.profileSwitch.activeMode,
  )

  // if user not exist
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  // first check the organization role
  const isOrgRole =
    typeof activeMode === "object" &&
    activeMode.id &&
    roles.includes(activeMode.role)

  // second check the user role
  const isUserRole =
    typeof activeMode === "string" && roles.includes(activeMode)

  if (isOrgRole || isUserRole) {
    return <>{children}</>
  }

  if (user) {
    dispatch(setProfileActiveMode(user.systemRole || Roles.USER))
    toast({
      variant: "destructive",
      title: "Access denied!",
    })
    return <>{children}</>
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />
}